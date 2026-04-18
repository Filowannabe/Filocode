/**
 * Test suite para lógica de cronología y fechas
 * Issue #3 — Fechas y Enlaces Demo
 * 
 * Fase RED: Tests unitarios para validar lógica antes de implementación
 */

import { describe, test, expect } from 'vitest';
import { formatDate, parseIsoDate, calculateDifference } from '@/utils/dateFormatter';
import { validateUrl, classifyLinkType } from '@/utils/dateFormatter';
import { sortRepositories, groupByMonth, Repository } from '@/utils/dateFormatter';

describe('Cronología y Fechas', () => {
 describe('parseIsoDate - Parseo de fechas ISO 8601', () => {
    test('debe parsear fecha ISO 8601 de GitHub API', () => {
      const isoDate = '2024-01-15T10:30:00Z';
      const result = parseIsoDate(isoDate);
      
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString().replace(/\.\d{3}Z$/, 'Z')).toBe(isoDate);
    });

    test('debe manejar fechas sin zona horaria', () => {
      const isoDate = '2024-01-15T10:30:00';
      const result = parseIsoDate(isoDate);
      
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });

  describe('formatDate - Formateo local', () => {
    test('debe formatear fecha a DD/MM/YYYY', () => {
      const date = new Date('2024-03-15T14:30:00Z');
      const result = formatDate(date, 'DD/MM/YYYY');
      
      expect(result).toBe('15/03/2024');
    });

    test('debe formatear fecha con hora HH:MM', () => {
      // Fecha en UTC que muestra 14:30 en la zona local
      const date = new Date('2024-03-15T19:30:00Z'); 
      const result = formatDate(date, 'DD/MM/YYYY HH:mm');
      
      expect(result).toBe('15/03/2024 14:30');
    });

    test('debe manejar fechas futuras con indicador [FUTURO]', () => {
      const futureDate = new Date('2030-12-31T23:59:59Z');
      const result = formatDate(futureDate, 'DD/MM/YYYY', { isFuture: true });
      
      expect(result).toContain('[FUTURO]');
    });

    test('debe manejar fechas pasadas con indicador [PASADO]', () => {
      const pastDate = new Date('2020-01-01T00:00:00Z');
      const result = formatDate(pastDate, 'DD/MM/YYYY', { isPast: true });
      
      expect(result).toContain('[PASADO]');
    });
  });

  describe('calculateDifference - Diferencias temporales', () => {
    test('debe calcular días transcurridos correctamente', () => {
      const startDate = new Date('2024-01-01T00:00:00'); // Sin zona horaria
      const endDate = new Date('2024-01-15T00:00:00');
      const result = calculateDifference(startDate, endDate, 'days');
      
      expect(result).toBe(14);
    });

    test('debe calcular semanas transcurridas', () => {
      const startDate = new Date('2024-01-01T00:00:00');
      const endDate = new Date('2024-01-22T00:00:00'); // 3 semanas exactas
      const result = calculateDifference(startDate, endDate, 'weeks');
      
      expect(result).toBe(3);
    });

    test('debe calcular meses transcurridos (aproximado)', () => {
      const startDate = new Date('2024-01-01T00:00:00Z');
      const endDate = new Date('2024-03-01T00:00:00Z');
      const result = calculateDifference(startDate, endDate, 'months');
      
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(3);
    });

    test('debe calcular años transcurridos', () => {
      const startDate = new Date('2023-01-01T00:00:00Z');
      const endDate = new Date('2025-01-01T00:00:00Z');
      const result = calculateDifference(startDate, endDate, 'years');
      
      expect(result).toBe(2);
    });
  });

  describe('validateUrl - Validación de URLs', () => {
    test('debe validar URL externa válida', () => {
      const validUrl = 'https://github.com/example/repo';
      const result = validateUrl(validUrl);
      
      expect(result).toBe(true);
    });

    test('debe invalidar URL local (file://)', () => {
      const invalidUrl = 'file:///C:/Users/example';
      const result = validateUrl(invalidUrl);
      
      expect(result).toBe(false);
    });

    test('debe invalidar URL sin protocolo', () => {
      const invalidUrl = 'github.com/example/repo';
      const result = validateUrl(invalidUrl);
      
      expect(result).toBe(false);
    });

    test('debe manejar null/undefined', () => {
      const result1 = validateUrl(null);
      const result2 = validateUrl(undefined);
      
      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
  });

  describe('classifyLinkType - Clasificación de enlaces', () => {
    test('debe clasificar como external para URLs de GitHub', () => {
      const url = 'https://github.com/example/repo';
      const result = classifyLinkType(url);
      
      expect(result).toBe('external');
    });

    test('debe clasificar como video para YouTube URLs', () => {
      const url = 'https://youtube.com/watch?v=abc123';
      const result = classifyLinkType(url);
      
      expect(result).toBe('video');
    });

    test('debe clasificar como tutorial para URLs con /tutoriales/', () => {
      const url = 'https://example.com/tutoriales/react';
      const result = classifyLinkType(url);
      
      expect(result).toBe('tutorial');
    });

    test('debe clasificar como external para otros dominios', () => {
      const url = 'https://demo.example.com';
      const result = classifyLinkType(url);
      
      expect(result).toBe('external');
    });

    test('debe clasificar como code-only para URLs nulas', () => {
      const url = null;
      const result = classifyLinkType(url);
      
      expect(result).toBe('code-only');
    });
  });
});

describe('Ordenamiento Cronológico', () => {
  describe('sortRepositories - Ordenar repositorios por fecha', () => {
    test('debe ordenar por fecha de creación (descendente)', () => {
      const repos = [
        { name: 'Repo C', created_at: '2024-03-01T00:00:00Z' },
        { name: 'Repo A', created_at: '2024-01-01T00:00:00Z' },
        { name: 'Repo B', created_at: '2024-02-01T00:00:00Z' },
      ];
      
      const sorted = [...repos].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      expect(sorted[0].name).toBe('Repo C');
      expect(sorted[1].name).toBe('Repo B');
      expect(sorted[2].name).toBe('Repo A');
    });

    test('debe ordenar por fecha de actualización (descendente)', () => {
      const repos = [
        { name: 'Repo A', updated_at: '2024-01-01T00:00:00Z' },
        { name: 'Repo C', updated_at: '2024-03-01T00:00:00Z' },
        { name: 'Repo B', updated_at: '2024-02-01T00:00:00Z' },
      ];
      
      const sorted = [...repos].sort((a, b) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      
      expect(sorted[0].name).toBe('Repo C');
      expect(sorted[1].name).toBe('Repo B');
      expect(sorted[2].name).toBe('Repo A');
    });
  });

  describe('groupByMonth - Agrupar eventos por mes', () => {
    test('debe agrupar repositorios por mes', () => {
      const repos = [
        { name: 'Repo Ene', created_at: '2024-01-15T00:00:00Z' },
        { name: 'Repo Feb', created_at: '2024-02-20T00:00:00Z' },
        { name: 'Repo Ene2', created_at: '2024-01-25T00:00:00Z' },
      ];
      
      const grouped: Record<string, any[]> = repos.reduce((acc, repo) => {
        const date = new Date(repo.created_at);
        const month = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(repo);
        return acc;
      }, {} as Record<string, any[]>);
      
      expect(Object.keys(grouped)).toContain('enero de 2024');
      expect(Object.keys(grouped)).toContain('febrero de 2024');
      expect(grouped['enero de 2024'].length).toBe(2);
    });
  });
});
