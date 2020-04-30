import React, { useState } from 'react'

const TEST_NAMES = ['Alice', 'Bob', 'Carol']

function App() {
  const [names, setNames] = useState<string[]>(TEST_NAMES)
  const [lastPickedName, setLastPickedName] = useState<string>()

  function addNewName() {
    const newName = prompt('Name to add:')
    if (newName) setNames([...names, newName])
  }

  function removeName(index: number) {
    setNames(names.filter((_, i) => i !== index))
  }

  function pickRandomName() {
    let pickedName
    do {
      pickedName = names[Math.floor(Math.random() * names.length)]
    } while (pickedName === lastPickedName)

    alert(`Picked name: ${pickedName}`)
    setLastPickedName(pickedName)
  }

  return (
    <>
      <button onClick={addNewName}>Add new name</button>
      <button onClick={pickRandomName} disabled={names.length < 2}>
        Pick random name
      </button>

      {names.map((name, index) => (
        <div>
          <button onClick={() => removeName(index)}>Remove</button>
          {name}
        </div>
      ))}
    </>
  )
}

export default App
