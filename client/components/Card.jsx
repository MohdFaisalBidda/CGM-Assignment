import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { increaseFollowCount } from "@/store/userSlice";

export default function ProfileCard({ username, firstname }) {
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(increaseFollowCount());
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {username}
        </Typography>
        <Typography color="text.secondary">{firstname}</Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={handleFollow}>
          Follow
        </Button>
      </CardActions>
    </Card>
  );
}
