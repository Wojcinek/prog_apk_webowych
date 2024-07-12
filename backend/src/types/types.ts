export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Project: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      Story: {
        Row: {
          createdAt: string | null
          description: string | null
          id: string
          name: string
          ownerId: string | null
          priority: Database["public"]["Enums"]["priority"] | null
          projectId: string | null
          status: Database["public"]["Enums"]["status"] | null
        }
        Insert: {
          createdAt?: string | null
          description?: string | null
          id?: string
          name: string
          ownerId?: string | null
          priority?: Database["public"]["Enums"]["priority"] | null
          projectId?: string | null
          status?: Database["public"]["Enums"]["status"] | null
        }
        Update: {
          createdAt?: string | null
          description?: string | null
          id?: string
          name?: string
          ownerId?: string | null
          priority?: Database["public"]["Enums"]["priority"] | null
          projectId?: string | null
          status?: Database["public"]["Enums"]["status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "Story_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Story_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
        ]
      }
      Task: {
        Row: {
          assignedUser: string | null
          createdAt: string | null
          description: string
          endDate: string | null
          estimatedTime: number
          id: string
          name: string
          priority: Database["public"]["Enums"]["priority"]
          startDate: string | null
          status: Database["public"]["Enums"]["status"]
          storyId: string
        }
        Insert: {
          assignedUser?: string | null
          createdAt?: string | null
          description: string
          endDate?: string | null
          estimatedTime: number
          id?: string
          name: string
          priority: Database["public"]["Enums"]["priority"]
          startDate?: string | null
          status: Database["public"]["Enums"]["status"]
          storyId: string
        }
        Update: {
          assignedUser?: string | null
          createdAt?: string | null
          description?: string
          endDate?: string | null
          estimatedTime?: number
          id?: string
          name?: string
          priority?: Database["public"]["Enums"]["priority"]
          startDate?: string | null
          status?: Database["public"]["Enums"]["status"]
          storyId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Task_assignedUser_fkey"
            columns: ["assignedUser"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Task_storyId_fkey"
            columns: ["storyId"]
            isOneToOne: false
            referencedRelation: "Story"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          firstName: string
          id: string
          lastName: string
          login: string
          password: string
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          firstName: string
          id?: string
          lastName: string
          login: string
          password: string
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          firstName?: string
          id?: string
          lastName?: string
          login?: string
          password?: string
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      priority: "low" | "medium" | "high"
      role: "admin" | "developer" | "devops"
      status: "todo" | "doing" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
