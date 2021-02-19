import React from 'react';
import trollface from './trollface.png';
export default function Header() {
  return (
    <header>
      <img src={trollface} alt="Troll Face" />
      <p>Meme Generator</p>
    </header>
  )
}