import { ActionFunctionArgs, json } from "@remix-run/node";
import { generateAltText } from "~/utils/ai";
import verifyRecaptcha from "~/utils/recaptcha";
import { supabase } from "~/utils/supabase";

interface Body {
  token: string;
  base64: string;
  response_format: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = (await request.json()) as Body;
  const { token, base64, response_format } = body;
  const isValid = await verifyRecaptcha(token);
  if (!isValid) {
    return json({ message: "Invalid captcha token" }, { status: 400 });
  }

  const response = await generateAltText(base64, response_format);

  if (process.env.LOGS === "true") {
    await supabase.from("Alt").insert([
      {
        text: response || "No alt text generated",
      },
    ]);
  }
  return json({ response });
}
