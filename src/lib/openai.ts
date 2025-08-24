import OpenAI from "openai";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

class OpenAIService {
  private client: OpenAI | null = null;
  private model: string;
  private maxTokens: number;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
    this.model = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini";
    this.maxTokens = parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || "1000");

    if (apiKey) {
      this.client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // Required for client-side usage
      });
    } else {
      console.warn(
        "OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment variables."
      );
    }
  }

  private getSystemPrompt(): string {
    return `คุณคือ Lawra ทนายความ AI ให้คำตอบสั้นๆ กระชับ ไม่เกิน 10 บรรทัด เน้นประเด็นสำคัญ และแนะนำปรึกษาทนายมืออาชีพ`;
  }

  async sendMessage(
    userMessage: string,
    conversationHistory: ChatMessage[] = []
  ): Promise<string> {
    if (!this.client) {
      throw new Error("OpenAI client not configured");
    }

    try {
      const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: "system", content: this.getSystemPrompt() },
        ...conversationHistory.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        { role: "user", content: userMessage },
      ];

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
        max_completion_tokens: this.maxTokens,
      });

      const response = completion.choices[0]?.message?.content;
      const finishReason = completion.choices[0]?.finish_reason;

      console.log('OpenAI Response Details:', {
        finishReason,
        hasContent: !!response,
        contentLength: response?.length || 0,
        usage: completion.usage
      });

      if (!response || response.trim() === '') {
        if (finishReason === 'length') {
          throw new Error('คำตอบยาวเกินไป กรุณาลองถามคำถามที่สั้นกว่านี้ หรือแบ่งเป็นหลายคำถาม');
        }
        throw new Error("ไม่ได้รับคำตอบจาก AI กรุณาลองใหม่อีกครั้ง");
      }

      return response.trim();
    } catch (error) {
      console.error("OpenAI Service Error:", error);

      if (error instanceof OpenAI.APIError) {
        console.log("API Error Details:", {
          status: error.status,
          name: error.name,
          message: error.message,
          requestID: error.requestID,
        });

        if (error.status === 401) {
          throw new Error(
            "API key ไม่ถูกต้องหรือหมดอายุ กรุณาตรวจสอบการตั้งค่า"
          );
        } else if (error.status === 403) {
          throw new Error(
            "ไม่มีสิทธิ์ใช้งาน API หรือไม่มีเครดิต กรุณาตรวจสอบ billing ใน OpenAI account"
          );
        } else if (error.status === 429) {
          throw new Error("ใช้ API เกินโควต้า กรุณารอสักครู่แล้วลองใหม่");
        } else if (error.status === 400) {
          throw new Error(`คำขอไม่ถูกต้อง: ${error.message}`);
        } else if (error.status === 404) {
          throw new Error(`ไม่พบ model "${this.model}" กรุณาตรวจสอบการตั้งค่า`);
        }
        throw new Error(`OpenAI API Error (${error.status}): ${error.message}`);
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
    }
  }

  isConfigured(): boolean {
    return !!this.client;
  }
}

export const openAIService = new OpenAIService();
