const outfitMappings = {
    default: {
      walking: 'walking',
      eating: 'eating',
      idle: 'idle',
      petting: 'petting',
      washing: 'washing'
    },
    ChemicalEngineering: {
      walking: 'idle', // Use idle overlay for walking
      eating: 'eating',
      idle: 'idle',
      petting: 'petting'
    },
    ComputerScience: {
      walking: 'idle', // Use idle overlay for walking
      eating: 'eating',
      idle: 'idle',
      petting: 'petting'
    },
    RadiationHealthPhysics: {
      walking: 'walking',
      eating: 'eating',
      idle: 'idle',
      petting: 'idle' // Use idle overlay for petting
    },
    // Add other outfits here
  };
  
  export default outfitMappings;
  