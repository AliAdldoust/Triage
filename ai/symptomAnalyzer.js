
import 'dotenv/config';

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://ai.boxapi.ir/ai/v1",
  apiKey: process.env.BOXAPI_API_KEY,
});


export async function analyzeSymptoms(conversation) {

    try{

        // Inside your POST function:
        const response = await client.chat.completions.create({
            model: "gpt-5.4-mini",

            messages: [
     {
        role: "system",
                content: `
                You are a psychological support assistant in Persian language.
                So, your answers must be in Persian always.

                Based on the user's conversation from beginning to end
                (This is so important, you have to consider the whole conversation):

                1. Generate either a question or response that will help to
                find out the pateient's problem.

                2. If you ask a question, generate some possible answers along with as well. Answers must be short and clear.
     
                3. Ask as many as questions so you can soecifically find out 
                the patient's problem. 

                4. Never repeat a question that has already been asked.

                5. Before generating a new question, carefully review all previous
                questions and answers.

                6. Every new question must explore a different aspect of the
                patient's problem.

                7. If you already have enough information to understand the
                patient's problem, stop asking questions and provide a response.

                8. Do not ask questions just to keep the conversation going.


                If you send a response, return ONLY valid JSON in this exact format: 
                {
                    "response": "Your response"
                }



                If you ask a question, return ONLY valid JSON in this exact format:
                {
                    "question": "Your follow-up question",
                    "answers": [
                        "Answer 1",
                        "Answer 2",
                        "Answer 3"
                    ]
                }              
                `

    },

                {
                        ...conversation
                },


            ],


            max_completion_tokens: 700,


        });

        const follow_ups = response.choices[0].message.content;

        return follow_ups;

}


    catch (error) {
    console.error("BOX API error:", error);

    return Response.json(
        { error: String(error) },
        { status: 500 }
    );
}

}



