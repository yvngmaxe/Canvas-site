"use server";

type SubmitState = {
  status: "" | "success" | "error";
  message: string;
};

function validateContactForm(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function submitContactData(_prevState: unknown, formData: FormData): Promise<SubmitState> {
  const rawFormData = {
    last_name: formData.get("last_name") as string,
    first_name: formData.get("first_name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  if (!rawFormData.last_name) {
    return {
      status: "error",
      message: "姓が入力されていません。",
    };
  }

  if (!rawFormData.first_name) {
    return {
      status: "error",
      message: "名が入力されていません。",
    };
  }

  if (!rawFormData.email) {
    return {
      status: "error",
      message: "メールアドレスが入力されていません。",
    };
  }

  if (!validateContactForm(rawFormData.email)) {
    return {
      status: "error",
      message: "メールアドレスが不正です。",
    };
  }

  if (!rawFormData.message) {
    return {
      status: "error",
      message: "お問い合わせ内容が入力されていません。",
    };
  }

  const result = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: [
          {
            objectTypeId: "0-1",
            name: "lastname",
            value: rawFormData.last_name,
          },
          {
            objectTypeId: "0-1",
            name: "firstname",
            value: rawFormData.first_name,
          },
          {
            objectTypeId: "0-1",
            name: "company",
            value: rawFormData.company,
          },
          {
            objectTypeId: "0-1",
            name: "email",
            value: rawFormData.email,
          },
          {
            objectTypeId: "0-1",
            name: "message",
            value: rawFormData.message,
          },
        ],
      }),
    }
  );

  try {
    await result.json();
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "お問い合わせが送信できませんでした。",
    };
  }

  return {
    status: "success",
    message: "お問い合わせが送信されました。",
  };
}
