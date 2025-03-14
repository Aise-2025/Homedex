
import React from 'react';
import { initDB } from '../../lib/db';

const PropertyDetail = ({ property }) => {
  if (!property) {
    return <div>Immobilie nicht gefunden.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{property.description || 'Immobilie'}</h1>
      <p><strong>Land:</strong> {property.country}</p>
      <p><strong>Grundstücksgröße:</strong> {property.plotSize} m²</p>
      <p><strong>Wohnfläche:</strong> {property.livingSpace} m²</p>
      <p><strong>Preis:</strong> €{property.price}</p>
      <div style={styles.imageContainer}>
        {property.images && property.images.map((img, index) => (
          <img key={index} src={img} alt={`Bild ${index + 1}`} style={styles.image} />
        ))}
      </div>
      {/* Weitere Informationen können hier ergänzt werden */}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const db = await initDB();
  // Angenommen, alle Immobilien werden im Array db.data.sales gespeichert
  const property = db.data.sales.find(item => item.id === id) || null;
  
  return {
    props: {
      property,
    },
  };
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px'
  },
  image: {
    width: '300px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover'
  }
};

export default PropertyDetail;

