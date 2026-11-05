
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { colors } from "../theme";

function ProjectCard({
  title,
  image,
  description,
  techStack = [],
  liveLink,
  githubLink,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${colors.line}`,
        borderRadius: 3,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        transition: "border-color 0.2s ease",

        "&:hover": {
          borderColor: colors.accent,
        },
      }}
    >
      {/* Project Image */}
      {image ? (
        <Box
          sx={{
            width: "100%",
            height: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "#F5F5F3",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={`${title} preview`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 240,
            backgroundColor: colors.accentSoft,
          }}
        />
      )}

      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          "&:last-child": {
            pb: { xs: 2, sm: 2.5 },
          },
        }}
      >
        {/* Title */}
        <Typography
          component="h2"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: colors.ink,
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            mt: 0.8,
            mb: 2,
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: colors.muted,
          }}
        >
          {description}
        </Typography>

        {/* Tech Stack */}
        <Stack
          direction="row"
          flexWrap="wrap"
          sx={{
            columnGap: "10px",
            rowGap: "10px",
            mb: 2.5,
          }}
        >
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                borderRadius: 0,
                height: 32,
                px: 0.8,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: colors.ink,
                backgroundColor: "#F3F3F1",
              }}
            />
          ))}
        </Stack>

        {/* Buttons */}
        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            mt: "auto",
            "& .MuiButton-root": {
              flex: 1,
              minWidth: 0,
              borderRadius: 1.5,
              py: 1,
              px: 1,
              fontSize: { xs: "0.72rem", sm: "0.8rem" },
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
            },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
            href={githubLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!githubLink}
            sx={{
              color: colors.ink,
              borderColor: colors.line,
              "&:hover": {
                borderColor: colors.ink,
                backgroundColor: "#F8F8F7",
              },
            }}
          >
            GitHub
          </Button>

          <Button
            variant="contained"
            disableElevation
            endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            href={liveLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!liveLink}
            sx={{
              color: "#FFFFFF",
              backgroundColor: colors.ink,
              "&:hover": {
                backgroundColor: colors.accentDark,
              },
            }}
          >
            Live Demo
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
