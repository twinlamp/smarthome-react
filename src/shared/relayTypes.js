import { mdiRadiator, mdiRadiatorOff, mdiFan, mdiFanOff,
  mdiEngine, mdiEngineOff, mdiWater, mdiWaterOff, mdiPower,
  mdiPowerOff, mdiLightbulbOn, mdiLightbulb } from '@mdi/js';

const relayTypes = [
  { 'name': 'radiator', 'on': mdiRadiator, 'off': mdiRadiatorOff },
  { 'name': 'light', 'on': mdiLightbulbOn, 'off': mdiLightbulb },
  { 'name': 'fan', 'on': mdiFan, 'off': mdiFanOff },
  { 'name': 'engine', 'on': mdiEngine, 'off': mdiEngineOff },
  { 'name': 'water', 'on': mdiWater, 'off': mdiWaterOff },
  { 'name': '', 'on': mdiPower, 'off': mdiPowerOff },
]

export default relayTypes