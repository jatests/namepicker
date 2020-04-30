import React, { useState, FormEvent } from 'react'
import {
  Button,
  Card,
  Alert,
  Dialog,
  Classes,
  Elevation,
} from '@blueprintjs/core'

const TEST_NAMES = ['Alice', 'Bob', 'Carol']

function App() {
  const [names, setNames] = useState<string[]>(TEST_NAMES)
  const [newName, setNewName] = useState<string>('')
  const [lastPickedName, setLastPickedName] = useState<string>()
  const [randomNameAlertIsOpen, setRandomNameAlertIsOpen] = useState(false)
  const [addNewNameDialogIsOpen, setAddNewNameDialogIsOpen] = useState(false)

  function addNewName() {
    setAddNewNameDialogIsOpen(true)
  }

  function closeAddNewNameDialog() {
    setNewName('')
    setAddNewNameDialogIsOpen(false)
  }

  function finishAddingNewName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNames([...names, newName])
    closeAddNewNameDialog()
  }

  function removeName(index: number) {
    setNames(names.filter((_, i) => i !== index))
  }

  function pickRandomName() {
    let pickedName
    do {
      pickedName = names[Math.floor(Math.random() * names.length)]
    } while (pickedName === lastPickedName)

    setLastPickedName(pickedName)
    setRandomNameAlertIsOpen(true)
  }

  return (
    <div id="app">
      <Alert
        isOpen={randomNameAlertIsOpen}
        onClose={() => setRandomNameAlertIsOpen(false)}
        canEscapeKeyCancel
        canOutsideClickCancel
      >
        <p>Picked name:</p>
        <h2 className={Classes.HEADING}>{lastPickedName}</h2>
      </Alert>

      <Dialog
        title="Add new name"
        isOpen={addNewNameDialogIsOpen}
        onClose={closeAddNewNameDialog}
        style={{ width: 320 }}
      >
        <form onSubmit={finishAddingNewName}>
          <div className={Classes.DIALOG_BODY}>
            <p>
              <strong>Name to add:</strong>
            </p>
            <input
              type="text"
              className={[Classes.INPUT, Classes.LARGE].join(' ')}
              style={{ width: '100%' }}
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button intent="primary" type="submit">
                Add
              </Button>
            </div>
          </div>
        </form>
      </Dialog>

      <Button icon="plus" onClick={addNewName}>
        Add new name
      </Button>
      <Button
        icon="random"
        onClick={pickRandomName}
        disabled={names.length < 2}
      >
        Pick random name
      </Button>

      <div id="name-list">
        {names.map((name, index) => (
          <Card elevation={Elevation.TWO}>
            <h5 className={Classes.HEADING}>{name}</h5>
            <Button onClick={() => removeName(index)}>Remove</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App
