import React, { useEffect } from "react";
import { useState } from "react";
import * as apiservice from "../services/apiservice";
import { useAppContext } from "../components/AppContext";
import { DashboardLayout } from "../layouts/dashboard";
import { useLoggedIn, useProtectionCondition } from "../hooks/useProtected";
import { useNavigate } from "react-router-dom";
import { constants } from "../utils";
import { toast } from "react-toastify";

export default function ProjectUpload() {
  useLoggedIn();

  const [appState] = useAppContext();
  const [uploads, setUploads] = useState(null)

  const navigate = useNavigate();
  // allow only lecturers
  useProtectionCondition(
    (state) => state.userType !== constants.userTypes.lecturer,
    () => navigate(constants.routes.index)
  );

  useEffect(() => {
    if(appState.user){
      apiservice.getUploads()
      .then(uploads => {console.log(uploads); setUploads(uploads.body)})
      .catch(err => {
        console.log({err})
        toast("Unable to load uploaded topics")
      }) 
    }
  }, [])

  return (
    <DashboardLayout title="View Uploaded Files">
      <div>
        <table>
          <thead>
            <tr>
              <th>Uploaded Project Files</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {uploads &&
            (
              uploads.map(upload => <tr>
                <td>{upload.url}</td>
                <td>download</td>
                </tr>)
            )
            }
          </tbody>
        </table>

        {!uploads && <p>No data yet!</p>}
      </div>
    </DashboardLayout>
  );
}
