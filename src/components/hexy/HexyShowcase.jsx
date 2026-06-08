import React from 'react';
import { useStore } from '@nanostores/react';
import { isHexyPlaying } from '../../data/variables';
import HexySeccion1 from './Secciones/HexySeccion1';
import HexySeccion2 from './Secciones/HexySeccion2';
import HexySeccion3 from './Secciones/HexySeccion3';
import HexySeccion4 from './Secciones/HexySeccion4';
import HexyVibeEngine from './components/HexyVibeEngine';

export default function HexyShowcase() {
  const playing = useStore(isHexyPlaying);

  return (
    <>
      {playing && <HexyVibeEngine />}
      <HexySeccion1 />
      <HexySeccion2 />
      <HexySeccion3 />
      <HexySeccion4 />
    </>
  );
}
