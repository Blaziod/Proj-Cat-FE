import React, { useEffect } from "react";
import { useLoggedIn } from "../hooks/useProtected";
import { useState } from "react";
import * as apiservice from "../services/apiservice";
import { useAppContext } from "../components/AppContext";
import { DashboardLayout } from "../layouts/dashboard";

export default function studentUpload() {
  useLoggedIn();

  const [appState] = useAppContext();
}
