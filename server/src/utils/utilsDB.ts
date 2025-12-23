import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { VideoMetadata } from "../types";

async function connectDB() {
  const db = await open({
    filename: path.join(__dirname, "./../db/database.db"),
    driver: sqlite3.Database,
  });

  await db.run("PRAGMA busy_timeout = 5000");
  return db;
}

export async function getMusicFromDB(id: string) {
  try {
    const db = await connectDB();
    const music = (await db.get("SELECT * FROM musics WHERE id = ?", id)) as
      | VideoMetadata
      | undefined;

    if (music) {
      return music;
    }
  } catch (error) {
    console.error("Erro ao buscar música no DB:", error);
  }
  return null;
}

export async function saveMusicToDB(music: VideoMetadata) {
  const db = await connectDB();
  await db.run(
    `INSERT INTO musics (id, title, artist, releaseDate, thumbnailUrl, duration, url, uploader_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    music.id,
    music.title,
    music.artist,
    music.releaseDate,
    music.thumbnailUrl,
    music.duration,
    music.url,
    music.uploader_id,
    music.created_at
  );
}

export async function deleteMusicFromDB(id: string) {
  const db = await connectDB();
  await db.run("DELETE FROM musics WHERE id = ?", id);
}

export async function updateMusicInDB(music: VideoMetadata) {
  try {
    const db = await connectDB();
    await db.run(
      `UPDATE musics
     SET title = ?, artist = ?, releaseDate = ?, thumbnailUrl = ?, duration = ?, url = ?, uploader_id = ?, created_at = ?
     WHERE id = ?`,
      music.title,
      music.artist,
      music.releaseDate,
      music.thumbnailUrl,
      music.duration,
      music.url,
      music.uploader_id,
      music.created_at,
      music.id
    );
  } catch (error) {
    console.error("Erro ao atualizar música no DB:", error);
  }
}
