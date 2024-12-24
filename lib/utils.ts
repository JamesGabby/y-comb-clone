import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-UK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function generateRandomNumbers() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
}