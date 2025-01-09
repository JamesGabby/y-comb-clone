'use client'

import { Input } from "./ui/input"

const StartupForm = () => {
  return (
    <form action={() => {}} className="startup-form">
      <label htmlFor="title" className="startup-form_label">
        Title
      </label>
      <Input 
        id="title"
        name="title"
        className="startup-form_input"
        required
        placeholder="Startup Title"
      />
    </form>
  )
}

export default StartupForm