import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { formatCurrency } from "../../utils/helpers";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AirlineSeatIndividualSuiteOutlinedIcon from "@mui/icons-material/AirlineSeatIndividualSuiteOutlined";
import HotTubOutlinedIcon from "@mui/icons-material/HotTubOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Button, Checkbox, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function HouseCard({
  img = "https://photos.zillowstatic.com/fp/b83e074eb9711d82c4149ef703a92ef8-p_c.jpg",
  address = "7446 Captain John Ln, ",
  city = "San Francisco",
  state = "CA",
  zip = "94121",
  price = 380000,
  beds = 5,
  baths = 3,
  id,
  handleToggleFavorite,
  isFavorite,
  showCompare,
  disableCompare,
  updateCompareProperties,
  checked = false

}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLearnMoreClick = () => {
    // navigate(`/property/${id}`);
    navigate(`/property/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{
          width: 345,
          height: 250,
          position: "relative",
        }}
      >
        <img src={img} alt="Paella dish" width={"100%"} height={"100%"} />
        {showCompare && <Checkbox
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          checked={checked}
          disabled={disableCompare}
          onChange={(e) => updateCompareProperties(id, e.target.checked)}
        />}
      </CardMedia>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ mb: 1 }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {formatCurrency(price)}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="flex-end">
            <Typography>
              <AirlineSeatIndividualSuiteOutlinedIcon /> {beds}
            </Typography>
            <Typography>
              <HotTubOutlinedIcon /> {baths}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <LocationOnOutlinedIcon /> {address} {city}, {state}, {zip}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Button
            size="medium"
            variant="contained"
            onClick={handleLearnMoreClick}
          >
            Learn More
          </Button>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleToggleFavorite(id)}
            >
              {isFavorite ? (
                <FavoriteOutlinedIcon color="error" size="medium" />
              ) : (
                <FavoriteBorderOutlinedIcon color="primary" size="medium" />
              )}
            </IconButton>
            <IconButton aria-label="share">
              <ShareOutlinedIcon color="primary" size="medium" />
            </IconButton>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}
