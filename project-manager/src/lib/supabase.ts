import { createClient } from '@supabase/supabase-js'
import { Database } from '../types'

const supabase = createClient<Database>(
	'https://unutiazafknivaencrrj.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudXRpYXphZmtuaXZhZW5jcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MzMxNjcsImV4cCI6MjAzNjIwOTE2N30.8rIrKuWTf6dWd9L71Z5l1GuFKXQUSfcimfDoJq6JnRE'
)

export default supabase
