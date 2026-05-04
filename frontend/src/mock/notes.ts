import type { Note } from "../types/note"

export const MOCK_TAGS = ['work', 'ideas', 'personal', 'to-do', 'reading', 'health', 'finance']

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content:
      '## Intro\nReact is a **JavaScript library** for building UIs.\n\n- Component-based\n- Virtual DOM\n- Unidirectional data flow',
    isPinned: true,
    isDeleted: false,
    tags: [
      { id: 't1', name: 'work' },
      { id: 't2', name: 'ideas' },
    ],
    createdAt: '2026-04-10T10:00:00Z',
    updatedAt: '2026-04-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'TypeScript Tips',
    content:
      '## Useful Patterns\n\nUse `type` over `interface` for consistency.\n\n```ts\ntype User = { id: string; name: string }\n```\n\nAlways prefer `unknown` over `any`.',
    isPinned: false,
    isDeleted: false,
    tags: [{ id: 't1', name: 'work' }],
    createdAt: '2026-04-11T09:00:00Z',
    updatedAt: '2026-04-11T09:00:00Z',
  },
  {
    id: '3',
    title: 'Weekend Plans',
    content:
      '## Saturday\n- Buy groceries\n- Clean apartment\n\n## Sunday\n- Hiking at the park\n- Read *The Pragmatic Programmer*',
    isPinned: true,
    isDeleted: false,
    tags: [{ id: 't3', name: 'personal' }],
    createdAt: '2026-04-12T08:00:00Z',
    updatedAt: '2026-04-13T10:00:00Z',
  },
  {
    id: '4',
    title: 'Project Ideas',
    content:
      '## App Ideas\n\n1. Markdown note-taking app\n2. Budget tracker with charts\n3. Habit tracker with streaks\n\n> Start small, ship fast.',
    isPinned: false,
    isDeleted: false,
    tags: [
      { id: 't2', name: 'ideas' },
      { id: 't3', name: 'personal' },
    ],
    createdAt: '2026-04-14T11:00:00Z',
    updatedAt: '2026-04-14T11:00:00Z',
  },
  {
    id: '5',
    title: 'Deleted Draft',
    content: '## Rough Draft\nThis note was moved to trash.\n\n- Item one\n- Item two',
    isPinned: false,
    isDeleted: true,
    tags: [{ id: 't2', name: 'ideas' }],
    createdAt: '2026-04-15T07:00:00Z',
    updatedAt: '2026-04-16T08:00:00Z',
  },
  {
    id: '6',
    title: 'Meeting Notes — Q2 Planning',
    content:
      '## Attendees\n- Alice, Bob, Carol\n\n## Action Items\n- **Alice**: finalize roadmap\n- **Bob**: schedule design review\n- **Carol**: update backlog',
    isPinned: false,
    isDeleted: false,
    tags: [
      { id: 't1', name: 'work' },
      { id: 't3', name: 'personal' },
    ],
    createdAt: '2026-04-17T14:00:00Z',
    updatedAt: '2026-04-18T15:00:00Z',
  },
]