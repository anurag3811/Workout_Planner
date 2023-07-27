import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const formData = req.body.formData || {};
  // if (animal.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid animal",
  //     }
  //   });
  //   return;
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 1000,
      prompt: generatePrompt(formData),
      temperature: 0.6,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: "0000"
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(formData) {
  
  // const capitalizedAnimal =
  //   animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `make a workout plan for a ${formData.age} year old, who wants to do workout for ${formData.fitnessGoal}, who is ${formData.height} tall has a weight of ${formData.weight} kg and wants to do the workout at ${formData.workoutLocation}
  Also take care of these:
  backPain: ${formData.backPain},
  neckPain: ${formData.neckPain},
  shoulderPain: ${formData.shoulderPain},
  kneePain: ${formData.kneePain},

make the plan for each day. after everyday just add '***'
  `;
}
