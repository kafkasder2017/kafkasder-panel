"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Context7Record } from '@/types/context7'

export default function DebugPage() {
  const [email, setEmail] = useState('isahamid095@gmail.com')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<Context7Record | null>(null)
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState<unknown>(null)
  const [user, setUser] = useState<unknown>(null)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Session error:', error)
        setResult({ error: error.message })
      } else {
        setSession(session)
        setUser(session?.user)
        setResult({ session: session ? 'Active session found' : 'No active session' })
      }
    } catch (error) {
      console.error('Session check error:', error)
      setResult({ error: 'Session check failed' })
    }
  }

  const handleSignIn = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }
      console.log('Attempting sign in with:', { email, password })

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('Sign in error:', error)
        setResult({ error: error.message })
      } else {
        console.log('Sign in success:', data)
        setResult({ success: 'Sign in successful', data })
        setSession(data.session)
        setUser(data.user)
      }
    } catch (error) {
      console.error('Sign in exception:', error)
      setResult({ error: 'Sign in failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }
      const { error } = await supabase.auth.signOut()
      if (error) {
        setResult({ error: error.message })
      } else {
        setResult({ success: 'Sign out successful' })
        setSession(null)
        setUser(null)
      }
    } catch (error) {
      setResult({ error: 'Sign out failed' })
    } finally {
      setLoading(false)
    }
  }

  const checkUser = async () => {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized')
      }
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        setResult({ error: error.message })
      } else {
        setResult({ user: user ? 'User found' : 'No user', data: user })
        setUser(user)
      }
    } catch (error) {
      setResult({ error: 'User check failed' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Supabase Auth Debug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSignIn} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button onClick={handleSignOut} disabled={loading} variant="outline">
                Sign Out
              </Button>
              <Button onClick={checkSession} variant="outline">
                Check Session
              </Button>
              <Button onClick={checkUser} variant="outline">
                Check User
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Session:</h4>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium">User:</h4>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium">Result:</h4>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> 
                <span className="ml-2 text-sm text-gray-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}
                </span>
              </div>
              <div>
                <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> 
                <span className="ml-2 text-sm text-gray-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 