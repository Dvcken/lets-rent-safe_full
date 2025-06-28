import React, { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../api/client';
import { authStorage } from '../api/utils/auth-storage';

const AuthContext = createContext();

const SUPER_ROLES = ['админ', 'суперадмин', 'директор'];

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuthInfo = async () => {
    if (!authStorage.getAccessToken()) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.get('/Auth/info');
      setAuthInfo(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setAuthInfo(null);
      // Если ошибка 401, токены уже очищены в apiRequest
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthInfo();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/Auth/login', credentials);
      authStorage.setTokens(response.data.accessToken, response.data.refreshToken);
      await fetchAuthInfo();
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const logout = () => {
    authStorage.clear();
    setAuthInfo(null);
  };

  const hasPermission = (permission) => {
    if (!authInfo) return false;
    
    if (SUPER_ROLES.includes(authInfo.employee.role)) {
      return true;
    }
    
    return authInfo.employee.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!authInfo) return false;
    return authInfo.employee.role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      authInfo, 
      isLoading, 
      error, 
      login,
      logout,
      refresh: fetchAuthInfo,
      hasPermission,
      hasRole,
      isAuthenticated: !!authInfo
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};