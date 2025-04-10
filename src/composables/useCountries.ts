import { ref, onMounted } from 'vue'
import axios from 'axios'

export interface Country {
  name: {
    common: string
  }
  capital?: string[]
  population?: number
  flags?: {
    svg?: string
  }
}

const countries = ref<Country[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchCountries = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get<Country[]>('https://restcountries.com/v3.1/all')
    countries.value = res.data
  } catch (err) {
    error.value = 'Erro ao buscar países.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

export function useCountries() {
  onMounted(fetchCountries)

  return {
    countries,
    loading,
    error,
  }
}
