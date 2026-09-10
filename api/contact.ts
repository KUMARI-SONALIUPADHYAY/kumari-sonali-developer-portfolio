import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email and message are required",
      });
    }

    const { error } = await supabase.from("messages").insert([
      {
        name,
        email,
        subject: subject || null,
        message,
      },
    ]);

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to save message",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}