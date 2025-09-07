"use server";

function validateContactForm(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function submitContactData(_prevState: any, formData: FormData) {
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

  return {
    status: "success",
    message: "お問い合わせが送信されました。",
  };
}
