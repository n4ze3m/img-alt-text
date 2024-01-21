import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import { HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const outputParser = new StringOutputParser();
const ALT_TEXT_PROMPT = `Your task is to describe the following image for its alt tag text generation. It must be meaningful, providing full details about the image and be SEO-friendly. Please respond with the alt text only, without any additional information. The maximum length is max 200 characters; do not exceed it. Do not include anyother information in your response.

Alt Text in {style}:`;

const llavaVisionModel = new ChatFireworks({
  modelName: "accounts/fireworks/models/firellava-13b",
  streaming: false,
});

export const generateAltText = async (
  image_base64: string,
  rewrite_format: string
) => {
  try {
    let imageBase64WithHeader = `data:image/jpeg;base64,${
      image_base64.split(",")[1]
    }`;

    const llavaHuman = new HumanMessage({
      content: [
        {
          text: ALT_TEXT_PROMPT,
          type: "text",
        },
        {
          image_url: {
            url: imageBase64WithHeader,
          },
          type: "image_url",
        },
      ],
    });

    const llavaPrompt = ChatPromptTemplate.fromMessages([llavaHuman]);
    const llavaChain = llavaPrompt.pipe(llavaVisionModel).pipe(outputParser);
    const result = await llavaChain.invoke({
      style: rewrite_format,
    });

    return result;
  } catch (error) {
    console.log(error);
    return "";
  }
};
