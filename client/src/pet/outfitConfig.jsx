/* 
Some outfit assets can be reused across different animations so instead of having a separate 
asset for each animation, we can map the outfit to the animation it should be used for. 
*/

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
  