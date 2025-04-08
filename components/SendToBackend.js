const sendToBackend = async (videoBlob) => {
  const formData = new FormData();
  formData.append("video", videoBlob, "video.webm");
  formData.append("audio", audioFile, audioFile.name || "audio.mp3");
  formData.append("title", title);
  formData.append("artist", artist);
  formData.append("date_of_creation", date);

  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    console.log("📤 Envoi de formData vers le backend avec token :", token);
    const response = await fetch(
      "https://seesound-backend.onrender.com/upload/save-visual",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur dans la réponse de l'API:", errorData);
      return;
    }

    const data = await response.json();
    console.log("✅ MP4 sauvegardé :", data);
  } catch (error) {
    console.error("❌ Erreur d'envoi :", error);
  } finally {
    setLoading(false);
  }
};
