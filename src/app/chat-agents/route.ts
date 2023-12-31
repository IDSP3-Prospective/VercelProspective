"use server";
import { NextRequest, NextResponse } from "next/server";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { AIMessage, ChatMessage, HumanMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";

// export const runtime = "edge";


export async function POST(req: NextRequest) {
  const TEMPLATE =
    'You are an expert at finding URLs of scholarships that meet a user\'s eligibility. You will receive the users scholarship eligibility as a JSON object then you will return an array of JSON objects of scholarship specifications from the scholarship website URLs that meet this criteria. Include the exact URL you visited for each scholarship in the "siteURL". Format it perfectly into JSON with the following format [{"title" : string, "description" : string, "shortDescription": string, "provider": string, "amount" : number, "siteURL" : string, "deadline", isodatestring}]. You only respond with an array of the JSON objects, never explain what you\'re doing or respond with any other text. \n\nUser eligibility JSON:\n{chat_history}\\nAI:';
  try {
    const body = await req.json();
    const returnIntermediateSteps = body.show_intermediate_steps;
    const tools = [new Calculator(), new SerpAPI()];
    const chat = new ChatOpenAI({ modelName: "gpt-4-1106-preview", temperature: 0 });

    const chatHistory = JSON.parse(body.messages.content)
    console.log(`Checking ${chatHistory}`)

    const formattedTemplate = TEMPLATE.replace("{chat_history}", JSON.stringify(chatHistory));

    const executor = await initializeAgentExecutorWithOptions(tools, chat, {
      agentType: "openai-functions",
      verbose: true,
      returnIntermediateSteps,
      memory: new BufferMemory({
        memoryKey: "chat_history",
        chatHistory: new ChatMessageHistory([]),
        returnMessages: true,
        outputKey: "output",
      }),
    });

    const result = await executor.call({
      input: formattedTemplate, // Use the formatted TEMPLATE
    });

    const ScholarshipArray = result.output;
    console.log(`output ${ScholarshipArray}`)

    return NextResponse.json({ output: ScholarshipArray }, { status: 200 });

    return NextResponse.json({ output: ScholarshipArray }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
