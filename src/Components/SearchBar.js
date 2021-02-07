import React from 'react'
import logo180 from '../assets/logo180.png'
import user from '../assets/user.svg'
import menu from '../assets/menu.svg'
import search from '../assets/white-search.svg'

import { TopNav } from './TopNav'
//import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleTyping = this.handleTyping.bind(this)
  }

  componentDidMount() {
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        this.props.onChange(document.getElementById('searchQuery').value)
      }
    }

    document
      .getElementById('searchQuery')
      .addEventListener('keypress', handleEnter)
  }

  handleChange() {
    //alert("Change!");
    const searchQuery = document.getElementById('searchQuery').value
    this.props.onChange(searchQuery)
  }

  handleTyping() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.handleChange()
    }, 1000)
  }

  // type() {
  //     const placeholders = [
  //         "Nintendo Switch Lite",
  //         "Converse size 7",
  //         "Black goodie"
  //     ];

  //     let count = 0;
  //     let index = 0;
  //     let currentText = " ";
  //     let letter = " ";

  //     function typing() {
  //         if (count === placeholders.length) {
  //             count = 0;
  //         }

  //         currentText = texts[count];

  //         if (letter.length === currentText.length) {
  //             count++;
  //             index = 0
  //         }

  //         setTimeout(typing, 400);
  //     }}

  render() {
    return (
      <div className="max-w-screen-md mx-auto flex flex-col justify-center">
        <div>
          <TopNav toggleMainDisplay={this.props.toggleMainDisplay} />
        </div>

        <div
          className="
                    w-full sm:w-11/12 px-3 lg:px-4 mx-auto h-8 flex flex-row no-wrap sm:mt-4 lg:mt-7"
        >
          <input
            type="text"
            placeholder="Ex. white converse size 7"
            id="searchQuery"
            className="w-full text-center text-sm italic pt-0.5 border border-r-0 rounded-tl-lg rounded-bl-lg"
          ></input>
          <button
            onClick={this.handleChange}
            className="
                        bg-red-500 w-8 rounded-tr-lg rounded-br-lg
                        p-2"
          >
            <img classname="" src={search} />
          </button>
        </div>

        <p
          className="
                        m-1 pt-0
                        text-xxs italic text-gray-500 text-center"
        >
          You are using the beta version. For the full version,{' '}
          <a
            href="https://tally.so/r/KnPxbn"
            rel="noopener noreferrer"
            target="blank"
            className="text-green-700"
          >
            click here.
          </a>
        </p>
      </div>
    )
  }
}
