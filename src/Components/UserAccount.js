import React from 'react'
import { Listing } from './Listing'
import { TopNav } from './TopNav'

import app from '../Firebase'
import firebase from 'firebase/app'

export class UserAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      login: false,
    }
    this.signUpWithEmailPassword = this.signUpWithEmailPassword.bind(this)
  }
  componentDidMount() {
    console.log(this.props)
    console.log(this.props.userObject)
  }
  signUpWithEmailPassword() {
    console.log('signup with email password')
    let rawEmail = document.getElementById('email').value
    let rawPassword = document.getElementById('password').value

    this.props.signUpWithEmailPassword(rawEmail, rawPassword)
  }

  render() {
    return (
      <div className="max-w-screen-md flex flex-col justify-center items-center content-center mx-auto px-3 md:px-6 md:pt-6 pb-20 ">
        {/* <IF USER IS SIGNED IN> */}
        <div className="w-full" hidden={!this.props.userObject.signedIn}>
          <h1 className="font-black text-2xl mb-3 sm:mb-6">My account</h1>
          <div className="w-full h-56 flex flex-col">
            <div className="h-24 w-full flex flex-row flex-nowrap">
              <div className="h-24 w-24 bg-yellow-50  rounded-full flex flex-col">
                <text className="text-5xl my-auto text-center w-24">🌱</text>
              </div>
              <div className="w-full p-2.5 flex flex-col justify-center content-center">
                <input
                  id="username"
                  value={
                    this.state.editing ? null : this.props.userObject.username
                  }
                  placeholder={
                    !this.state.editing ? null : this.props.userObject.username
                  }
                  style={{ fontWeight: '700' }}
                  className="rounded h-8 w-full border px-2
                    placeholder-black"
                ></input>
                <p
                  hidden={this.props.userObject.username ? true : false}
                  className="text-xs mt-1.5 italic text-red-600"
                >
                  Please set a username
                </p>
                <p className="text-xs mt-1.5 italic text-gray-600">
                  {this.props.userObject.email}
                </p>
                <p hidden className="text-xxs mt-0.5 italic text-gray-600">
                  {this.props.userObject.joinedOn}
                </p>
              </div>
            </div>
            <div className="h-32 w-full">
              <textarea
                value={this.state.editing ? null : this.props.userObject.bio}
                placeholder={
                  !this.state.editing ? null : this.props.userObject.bio
                }
                id="bio"
                className="w-full h-28 border rounded-lg mt-3 px-1.5 py-2 placeholder-black "
              ></textarea>
              <div className="w-full flex flex-row justify-end">
                <button
                  hidden={!this.state.editing}
                  onClick={() => {
                    const newUsername = document.getElementById('username')
                      .value
                    const newBio = document.getElementById('bio').value
                    this.props.updateUser(newUsername, newBio)
                    this.setState({ editing: false })
                    console.log('updating user')
                  }}
                  className="bg-lime-600 font-bold text-white rounded-md mx-2.5 px-2.5 py-1 my-2.5"
                >
                  Update
                </button>

                <button
                  hidden={this.state.editing}
                  onClick={() => {
                    this.setState({ editing: true })
                  }}
                  className="bg-lime-50 border-2  border-lime-600 font-bold text-lime-600 rounded-md mx-2.5 px-2.5 py-1 my-2.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    this.props.signOut()
                  }}
                  className="bg-red-500 text-white font-bold py-1 px-2.5 rounded-md my-2.5 "
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          {/* <h1>Hello! {this.props.userObject.email}</h1> */}
          {/* {this.props.favourites.map((fave) => {
            return <p>{fave.title}</p>
          })} */}
        </div>
        {/* </IF USER IS SIGNED IN> */}
        <div
          hidden={this.props.userObject.signedIn}
          className="max-w-screen-ipx w-full"
        >
          <div className="w-full h-full">
            <div className="bg-yellow-50 rounded-lg px-3 py-1.5 mt-5">
              <h1 className="font-bold w-full mx-auto text-yellow-700">
                {!this.state.login ? 'Hello, stranger!' : 'Welcome back!'}
              </h1>
              <p className="my-1 text-xs leading-tight text-yellow-700">
                {!this.state.login
                  ? "Sign up to experience all of Loma's features."
                  : 'Great to see you again.'}
              </p>
            </div>
            <div className="border rounded-lg px-3 py-1.5 mt-5 flex flex-col items-center">
              <div className="w-full flex flex-row justify-between items-center">
                <h1 id="signlog" className="font-black text-2xl">
                  {this.state.login ? 'Log in' : 'Sign up'}
                </h1>
                <p
                  onClick={() => {
                    this.setState({ login: !this.state.login })
                  }}
                  className="text-sm italic text-blue-400"
                >
                  {!this.state.login ? 'Log in' : 'Sign up'}
                </p>
              </div>

              <p className="text-8xl my-3 p-10 rounded-full bg-blue-50">
                {!this.state.login ? '🚀' : '👋'}
              </p>

              <div className=" rounded-lg px-3 pt-5 pb-7 flex flex-col justify-center items-center">
                <p className="text-xs italic tracking-tight text-gray-600">
                  Quick sign in:
                </p>
                <button
                  onClick={() => {
                    this.props.signInGoogle()
                    this.setState({ editing: true })
                  }}
                  className="bg-blue-600 font-bold text-white rounded px-2.5 py-1 w-52"
                >
                  Sign in with Google
                </button>
              </div>
              <div className="w-full">
                <p className="font-semibold text-sm text-gray-600 mt-3">
                  Email:
                </p>
                <input
                  id="email"
                  types="email"
                  className="rounded border w-full py-1 px-2"
                ></input>
                <p className="font-semibold text-sm text-gray-600 mt-2">
                  Password:
                </p>
                <input
                  id="password"
                  type="password"
                  className="rounded border w-full mb-3 py-1 px-2"
                ></input>
              </div>

              <button
                onClick={() => {
                  this.signUpWithEmailPassword()
                  this.setState({ editing: true })
                }}
                className="bg-lime-600 font-bold text-white rounded px-2.5 py-1 my-2.5 w-52"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
