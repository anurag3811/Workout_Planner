import React, { useState, useRef } from 'react';

const Home = () => {

  const ref = useRef(null);


    const removeEmptyLines = str => str.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');


        const initialFormData = {
          age: "",
          weight: "",
          height: "",
          fitnessGoal: "",
          backPain: false,
          neckPain: false,
          shoulderPain: false,
          kneePain: false,
          workoutLocation: "",
        };


        const [loading, setLoading] = useState(false);
        const [formData, setFormData] = useState(initialFormData);
        const[submitted,setSubmitted] = useState(false);
        const [submittedFormData, setSubmittedFormData] = useState(null);
        const [workoutPlanArray, setworkoutPlanArray] = useState([]);
      
        const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          const newValue = type === "checkbox" ? checked : value;
      
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
          }));
        };



        const [result, setResult] = useState();

        // async function onSubmit(event) {
        //   event.preventDefault();
        //   try {
        //     const response = await fetch("/api/generate", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ animal: animalInput }),
        //     });
      
        //     const data = await response.json();
        //     if (response.status !== 200) {
        //       throw data.error || new Error(`Request failed with status ${response.status}`);
        //     }
        //     console.log(data.result);
        //     setResult(data.result);
        //     // setAnimalInput("");
        //   } catch(error) {
        //     // Consider implementing your own error handling logic here
        //     console.error(error);
        //     alert(error.message);
        //   }
        // }
      
        async function handleSubmit(e) {
          e.preventDefault();
          setSubmitted(true);
          setLoading(true);
          setSubmittedFormData(formData); // Store submitted form data in a separate hook
          ref.current?.scrollIntoView({behavior: 'smooth'});

          try {
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ formData: formData }),
          });
    
          const data = await response.json();
          if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }
          console.log(data.result);
          setResult(data.result);
          setLoading(false);
          console.log("hello")
          console.log(typeof(data.result))
          setworkoutPlanArray(data.result.split("***"));
          console.log(workoutPlanArray)
        //   setAnimalInput("");
        } catch(error) {
          // Consider implementing your own error handling logic here
          console.error(error);
          alert(error.message);
        }

         
      
          // Logic to handle form submission and store the form 
          console.log(JSON.stringify(formData))
      

          setFormData(initialFormData); // Reset form data after submission
        };

        const headingz = "GYM JARVIS"

  return (
        <div className="flex flex-col w-full  min-h-screen bg-slate-950">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className=' bg-slate-950 w-full flex flex-col justify-center items-center upar'>
        <img src='/graphic.png' className=' h-1/2' />
        <p className='yellows text-center'> {headingz} </p>
        <p className='oyellow text-center'>Harnessing the intelligence of the ChatGPT API to curate personalized workouts.</p>

        </div>


        <div className='flex justify-center'>
          <form
            className="bg-white shadow-md rounded px-8 mt-16 py-6 w-11/12 h-min"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Section 1: Age, Weight, Height */}
              <div className="w-full sm:w-1/2 sm:pr-2">
                <label htmlFor="age" className="block font-medium mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="10"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2 mb-3 border-2 "
                  required
                />
      
                <label htmlFor="weight" className="block font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  min="20"
                  max="180"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2 mb-3 border-2 "
                  required
                />
      
                <label htmlFor="height" className="block font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  min="90"
                  max="220"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md px-3 py-2 mb-3 border-2 "
                  required
                />


                {/* hello  */}

                
      <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Workout Location:
          </p>
          <label className="block mb-2">
            <input
              type="radio"
              name="workoutLocation"
              value="gym"
              checked={formData.workoutLocation === 'gym'}
              onChange={handleChange}
              required
            />{' '}
            GYM
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              name="workoutLocation"
              value="home"
              checked={formData.workoutLocation === 'home'}
              onChange={handleChange}
              required
            />{' '}
            HOME
          </label>
        </div>
              </div>
      
              {/* Section 2: Fitness Goals, Pains/Injuries */}
              <div className="w-full sm:w-1/2 sm:pl-2 sm:mt-4 mt-0">
                <div className="mb-3  ml-0 sm:ml-16">
                  <span className="block font-medium mb-2">Fitness Goals</span>
                  <div>
                    <input
                      type="radio"
                      id="weight-loss"
                      name="fitnessGoal"
                      value="weight-loss"
                      checked={formData.fitnessGoal === "weight-loss"}
                      onChange={handleChange}
                      className='rr'
                    />
                    <label htmlFor="weight-loss">Weight Loss</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="muscle-gain"
                      name="fitnessGoal"
                      value="muscle-gain"
                      checked={formData.fitnessGoal === "muscle-gain"}
                      onChange={handleChange}
                      className='rr'
                    />
                    <label htmlFor="muscle-gain">Muscle Gain</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="general-fitness"
                      name="fitnessGoal"
                      value="general-fitness"
                      checked={formData.fitnessGoal === "general-fitness"}
                      onChange={handleChange}
                      className='rr'
                    />
                    <label htmlFor="general-fitness">General Fitness</label>
                  </div>
                </div>
      
                <div className="mb-3 ml-0 sm:ml-16">
                  <span className="block font-medium mb-2">Pains/Injuries</span>
                  <div>
                    <input
                      type="checkbox"
                      id="back-pain"
                      name="backPain"
                      checked={formData.backPain}
                      onChange={handleChange}
                      className='rr'
                    />
                    <label htmlFor="back-pain">Back Pain</label>
                  </div>
                  <div>
                    <input
                    type="checkbox"
                id="neck-pain"
                name="neckPain"
                checked={formData.neckPain}
                onChange={handleChange}
                className='rr'
              />
              <label htmlFor="neck-pain">Neck Pain</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="shoulder-pain"
                name="shoulderPain"
                checked={formData.shoulderPain}
                onChange={handleChange}
                className='rr'
              />
              <label htmlFor="shoulder-pain">Shoulder Pain</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="knee-pain"
                name="kneePain"
                checked={formData.kneePain}
                onChange={handleChange}
                className='rr'
              />
              <label htmlFor="knee-pain">Knee Pain</label>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Submit Button */}

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form></div></div>

    


  {submitted && (<>
    <div className='flex justify-center' ref={ref} >
      <div className=" border-2 border-white text-white shadow-md rounded px-8 py-6 mt-4 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/4">
        <h2 className="text-lg font-bold mb-4">Submitted Form Data:</h2>
        <p><span className='  font-bold mr-1'>Age: </span>{submittedFormData?.age}</p>
        <p><span className='  font-bold mr-1'>Weight: </span>{submittedFormData?.weight} kg</p>
        <p><span className='  font-bold mr-1'>Height: </span>{submittedFormData?.height} cm</p>
        <p><span className='  font-bold mr-1'>Fitness Goal: </span>{submittedFormData?.fitnessGoal}</p>
        <p><span className='  font-bold mr-1'>Pain/Injury:</span></p>
        <ul>
          {submittedFormData?.backPain && <li>Back Pain</li>}
          {submittedFormData?.neckPain && <li>Neck Pain</li>}
          {submittedFormData?.shoulderPain && <li>Shoulder Pain</li>}
          {submittedFormData?.kneePain && <li>Knee Pain</li>}
        </ul>
        <p><span className='  font-bold mr-1'>Workout Location: </span>{submittedFormData?.workoutLocation}</p>
        
      </div></div>
      
      </>
    )}

    {loading && (<>
      <div className=' mt-32 h-28'>
      <div className=' block ml-16'>
  <div id="loader" ></div>
  
  <div class="loader-section section-left"></div>
  <div class="loader-section section-right"></div>
  
  </div>
  
<div className=' flex justify-center'>
      <div className=' text-white font-semibold text-xl'>Generating your workout plan</div></div>
      
      </div>
    </>)}



    {/* <div className='results'>{result}</div> */}









    
    <div className='results grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3'>
      {workoutPlanArray?.map((day, index) => (
        <div key={index} className='m-3 bg-amber-300 rounded-xl p-3 shadow-sm'>
          {/* <h3 className=' mb-4'>Day {index + 1}</h3> */}
          <p>{removeEmptyLines(day)}</p>
        </div>
      ))}
</div>


    </div>
  );
};

export default Home;
