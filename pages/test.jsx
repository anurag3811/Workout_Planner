import React, {useState} from 'react'


const test = () => {

  const [formData, setformData] = useState({
    goal: "",
    age: "",
    weight: "",
    height: "",
    equipment:"",
    BackPain: false,
    NeckPain: false,
    ShoulderPain: false,
    KneePain: false
  })


  const handleChange = event => {
    const target = event.target
    const name = target.name
    const value = target.type =="checkbox"? target.checked : target.value

    setformData({...formData, [name]:value
    })
  }



  return (
    <>
    <div>test</div>

    <label>Age: </label>
    <input type='number' className='border-2'></input>

    <br />
    <br /><br /><br />
    <p>Goals:</p>

    <br /><br />

    
    <input type='radio' name="goal" value="muscle gain" onChange={handleChange}></input>
    <label>Muscle Gain </label>

    <input type='radio' name="goal" value="weight loss" onChange={handleChange}></input>
    <label>Weight loss </label>

    <input type='radio' name="goal" value="general fitness" onChange={handleChange}></input>
    <label>General fitness </label>



    <br /><br /><br /><br />

    <div>Goal: {formData.goal}</div>
</>
  )
}

export default test