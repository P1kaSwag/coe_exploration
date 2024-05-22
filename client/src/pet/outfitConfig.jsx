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
    CivilEngineering: {
      walking: 'walking',
      eating: 'eating',
      idle: 'walking',
      petting: 'petting'
    },
    ComputerScience: {
      walking: 'idle',
      eating: 'eating',
      idle: 'idle',
      petting: 'petting'
    },
    ConstructionEngineeringManagement: {
      walking: 'walking',
      eating: 'eating',
      idle: 'walking',
      petting: 'petting'
    },
    EnvironmentalEngineering: {
      walking: 'idle',
      eating: 'eating',
      idle: 'idle',
      petting: 'petting'
    },
    MechanicalEngineering: {
      walking: 'walking',
      eating: 'eating',
      idle: 'walking',
      petting: 'petting'
    },
    NuclearEngineering: {
      walking: 'idle', 
      eating: 'eating',
      idle: 'idle',
      petting: 'petting'
    },
    RadiationHealthPhysics: {
      walking: 'walking',
      eating: 'eating',
      idle: 'idle',
      petting: 'idle'
    },
    light: {
      walking: 'walking',
      eating: 'eating',
      idle: 'walking',
      petting: 'walking'
    },
    heavy: {
      walking: 'walking',
      eating: 'eating',
      idle: 'idle',
      petting: 'walking'
    },
    // Add other outfits here
  };
  
  export default outfitMappings;
  