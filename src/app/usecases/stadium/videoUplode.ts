import { stadium } from "../../../domain/models/stadium";
import { updateRes } from "../../../domain/models/update";
import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";

export const updateVideo =
  (stadiumRepo: stadiumRepository) =>
  async (id: string, uplodeVideo: string) => {
    const videoUplode: stadium | updateRes | undefined =
      await stadiumRepo.uplodeVideo(id, uplodeVideo);

    return videoUplode;
  };
