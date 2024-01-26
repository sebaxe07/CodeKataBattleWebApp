import React from "react";
import { Text } from "../common/text";

export const SuscribedTournaments = () => {
  const suscribedTournaments = [];
  return suscribedTournaments > 0 ? (
    <div>{/* Aquí va tu contenido */}</div>
  ) : (
    <div className="w-[590px] h-[200px] bg-bgaccent rounded-[36px] ml-20 flex items-center space-y-5">
      <Text
        text={["Join a tournament to see your active and past tournaments."]}
        size="text-[24px] text-start ml-5"
        fontColor="text-white"
        fontType="font-bold"
      />
    </div>
  );
};

export default SuscribedTournaments;
