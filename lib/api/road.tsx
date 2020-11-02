import axios from '../util/axios.config'
import { START_NEW_MAP_ENDPOINT } from '../util/constant'

class RoadMapAPI {
  async start() {
    await axios.post(START_NEW_MAP_ENDPOINT)
  }
}

export default new RoadMapAPI