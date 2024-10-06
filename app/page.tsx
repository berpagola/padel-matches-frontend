'use client'

import { useState, useEffect } from 'react'
import { ChevronRightIcon } from 'lucide-react'

interface Player {
  nombre: string
  apellido: string
  nacionalidad: string | null
  id: number
}

interface Team {
  id: number
  jugador1: Player
  jugador2: Player
}

interface Tournament {
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  ubicacion: string
  id: number
}

interface Match {
  fecha: string
  cancha: string
  horario_inicio_cancha: string
  hora_local_actual: string
  horario: string
  tipo_horario: string
  round: string
  sets1: string[]
  sets2: string[]
  estado: string
  hora_buenos_aires: string
  id: number
  equipo1: Team
  equipo2: Team
  torneo: Tournament
}

// Función auxiliar para extraer solo la hora o devolver el texto original si la fecha no es válida
function extractHour(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) {
    // Si la fecha no es válida, devuelve el texto original
    return dateTimeString;
  }
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

// Nueva interfaz para agrupar partidos
interface GroupedMatches {
  torneo: Tournament;
  fecha: string;
  cancha: string;
  matches: Match[];
}

// Función para agrupar partidos
function groupMatches(matches: Match[]): GroupedMatches[] {
  const groupedMap = matches.reduce((acc, match) => {
    const key = `${match.torneo.id}-${match.fecha}-${match.cancha}`;
    if (!acc.has(key)) {
      acc.set(key, {
        torneo: match.torneo,
        fecha: match.fecha,
        cancha: match.cancha,
        matches: []
      });
    }
    acc.get(key)!.matches.push(match);
    return acc;
  }, new Map<string, GroupedMatches>());

  return Array.from(groupedMap.values());
}

export default function Component() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      console.log('Iniciando fetchMatches') // Nuevo log
      try {
        setLoading(true)
        setError(null)
        console.log('Haciendo fetch a http://127.0.0.1:8000/partidos/') // Nuevo log
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const response = await fetch(`${API_URL}/partidos/`)
        console.log('Respuesta recibida:', response.status, response.statusText) // Nuevo log
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Datos recibidos:', data) // Log existente
        setMatches(data)
      } catch (e: unknown) {
        console.error('Error detallado:', e)
        if (e instanceof Error) {
          setError(`Error al cargar los partidos: ${e.message}`)
        } else {
          setError('Error desconocido al cargar los partidos')
        }
      } finally {
        setLoading(false)
        console.log('fetchMatches completado') // Nuevo log
      }
    }

    fetchMatches()
  }, [])

  console.log('Estado actual:', { loading, error, matchesCount: matches.length }) // Nuevo log

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  const groupedMatches = groupMatches(matches);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Padel Matches</h1>
      <div className="space-y-6">
        {groupedMatches.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{group.torneo.nombre}</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{group.fecha}</p>
                  <p className="text-sm text-gray-600">{group.cancha}</p>
                </div>
                <div className="text-sm font-medium text-green-600">
                  {extractHour(group.matches[0].horario_inicio_cancha)}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {group.matches.map((match) => (
                <div key={match.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-semibold text-blue-600">{match.round}</div>
                    {match.estado !== "Completed" && (
                      <div className="text-sm font-medium text-green-600">{extractHour(match.hora_buenos_aires)}</div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <TeamDisplay team={match.equipo1} sets={match.sets1} />
                    <div className="border-t border-gray-200 my-2"></div>
                    <TeamDisplay team={match.equipo2} sets={match.sets2} />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm font-medium text-gray-600">{match.estado}</div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamDisplay({ team, sets }: { team: Team; sets: string[] }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 pr-4">
        <div className="font-medium">{`${team.jugador1.nombre} ${team.jugador1.apellido}`}</div>
        <div className="font-medium">{`${team.jugador2.nombre} ${team.jugador2.apellido}`}</div>
      </div>
      <div className="flex space-x-2 min-w-[96px] justify-end">
        {sets.map((set, index) => (
          <div key={index} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
            {set}
          </div>
        ))}
      </div>
    </div>
  )
}