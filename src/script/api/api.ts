export class ApiFetch<T> {
  private filePath: string;
  private cache: T | null;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.cache = null;
  }

  async fetchData(): Promise<T> {
    if (this.cache) {
      return this.cache;
    }
    try {
      const response = await fetch(this.filePath);
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la lecture du fichier : ${response.statusText}`
        );
      }
      const data = await response.json();
      this.cache = data;
      if (this.cache === null) {
        throw new Error("Erreur: les données récupérées sont nulles");
      }
      return this.cache;
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
      throw error;
    }
  }
}

import { Media } from "../model/media";
import { ModelPhotographer } from "../model/photographer";

export async function getPhotographersData(): Promise<ModelPhotographer[]> {
  const apiPhotographe = new ApiFetch<{ photographers: ModelPhotographer[] }>(
    "./src/data/photographers.json"
  );
  try {
    const data = await apiPhotographe.fetchData();
    console.log("Données récupérées :", data.photographers);
    return data.photographers;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
}

export async function getMediaData(): Promise<Media[]> {
  const apiPhotographe = new ApiFetch<{ media: Media[] }>(
    "./src/data/photographers.json"
  );
  try {
    const data = await apiPhotographe.fetchData();
    console.log("Données récupérées :", data.media);
    return data.media;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
}
