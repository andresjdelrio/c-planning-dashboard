export interface Epic {
  id: string;
  initiative_id: string;
  name: string;
  description?: string;
  effort_level?: string;
  resource?: string;
  status?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Initiative {
  id: string;
  op1: string;
  op2: string;
  team: string;
  op3: string;
  platform?: string;
  initiatives: string;
  c?: string;
  effort_level?: string;
  resource?: string;
  impact?: string;
  priority?: string;
  comments?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  epics?: Epic[];
}

export interface InitiativeCreate {
  op1: string;
  op2: string;
  team: string;
  op3: string;
  platform?: string;
  initiatives: string;
  c?: string;
  effort_level?: string;
  resource?: string;
  impact?: string;
  priority?: string;
  comments?: string;
  order_index?: number;
}

export interface TeamFilterState {
  teams: string[];
  resources: string[];
  priorities: string[];
}

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  initiatives: Initiative[];
  color: string;
}
