import { useState, useEffect } from 'react'
import { db, auth } from './firebaseConnection'

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import './App.css'
import { async } from '@firebase/util'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts() {
      const dados = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = []

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(listaPost)

      })
    }

    loadPosts()

  }, [])

  async function adicionarPost() {

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log("Cadastro efetuado com sucesso!")
        setAutor('')
        setTitulo('')
      })
      .catch((error) => {
        console.log("ERRO " + error)
      })
  }

  async function buscaPost() {

    const postRef = collection(db, "posts")

    await getDocs(postRef)
      .then((snapshot) => {
        let lista = []
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(lista)
      })
      .catch((error) => {
        console.log("ERRO AO BUSCAR POSTS" + error)
      })

  }

  async function editarPost() {

    const docRef = doc(db, "posts", idPost)

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log("POST ATUALIZADO!");
        setIdPost('');
        setAutor('');
        setTitulo('');
      })
      .catch((error) => {
        console.log("ERRO AO EDITAR POST" + error)
      })
  }

  async function excluirPost(id) {

    const docRef = doc(db, "posts", id)

    await deleteDoc(docRef)
      .then(() => {
        alert("POST EXCLUIDO COM SUCESSO!")
      })
      .catch((error) => {
        console.log("ERRO AO EXCLUIR O POST" + error)
      })
  }

  return (
    <div>
      <h1>REACTJS + FIREBASE :^)</h1>
      <div className='container'>
        <h2>POSTS</h2>

        <label>ID do Post:</label>
        <input placeholder='Digite o ID do Post' value={idPost} onChange={(id) => setIdPost(id.target.value)} />
        <br />

        <label>Título:</label>
        <textarea type='text' placeholder='Digite o Título' value={titulo} onChange={(titulo) => setTitulo(titulo.target.value)} />
        <br />

        <label>Autor:</label>
        <input placeholder='Digite o nome do Autor' type='text' value={autor} onChange={(autor) => setAutor(autor.target.value)} />
        <br/>

        <button onClick={adicionarPost}>Cadastrar</button>
        <button onClick={buscaPost}>Buscar Post</button>
        <button onClick={editarPost}>Editar Post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li>
                <span>ID: {post.id}</span><br/>
                <span>Título: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App