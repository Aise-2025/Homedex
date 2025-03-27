// components/Header.tsx
export {}; // Damit wird die Datei als Modul behandelt

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 border-b">
      <div className="logo text-2xl font-bold">Homedex</div>
      {/* Restlicher Code */}
    </header>
  );
};

export default Header;

