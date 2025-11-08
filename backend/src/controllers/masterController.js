import { supabase } from "../config/supabaseClient.js";

export const getMasterData = async (req, res) => {
  try {
    const { data: files, error } = await supabase.storage
      .from("sanko-safety-storage")
      .list("", { sortBy: { column: "name", order: "asc" } });

    if (error) throw error;

    // กรองเฉพาะไฟล์ที่ต้องการ
    const wantedFiles = ["map-sanko-floor1.png", "map-sanko-floor2.png"];
    const filteredFiles = files.filter((file) => wantedFiles.includes(file.name));

    const signedUrls = await Promise.all(
      filteredFiles.map(async (file) => {
        const { data: signedData, error: signedError } = await supabase.storage
          .from("sanko-safety-storage")
          .createSignedUrl(file.name, 60 * 10);

        if (signedError) throw signedError;

        return {
          name: file.name,
          url: signedData.signedUrl,
        };
      })
    );

    res.json({ images: signedUrls });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
