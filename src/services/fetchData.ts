const BASE_URL = import.meta.env.VITE_BASE_URL || "https://2dframe.com/api";

export async function postModel(modelId: string, formData: FormData): Promise<void> {
    const res = await fetch(`${BASE_URL}/model/${modelId}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ modelId, formData }),
    });
    if (!res.ok) throw new Error(`Server error - status ${res.status}`);
    return await res.json();
}
