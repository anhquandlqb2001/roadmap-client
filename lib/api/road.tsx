import axios from '../util/axios.config'
import { ADD_NEW_MAP_ENDPOINT } from '../util/constant'

class RoadMapAPI {
  async start() {
    await axios.post(ADD_NEW_MAP_ENDPOINT)
  }
}

export default new RoadMapAPI