import React, { useState, useRef, useEffect } from "react"

import { randomParagraphs } from "./randomParagraphs"

const Flasher: React.FC = () => {
  const content = useRef(randomParagraphs(1))
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(visible => !visible)
    }, 1000)
    return (): void => {
      clearTimeout(timer)
    }
  }, [])
  return visible ? (
    <>
      <h2 id="flasher">Flasher</h2>
      <p>{content.current}</p>
    </>
  ) : null
}
export default Flasher
