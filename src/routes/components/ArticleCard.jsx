import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const ArticleCard = ({ title, image, article_id }) => {
    return (
        <Card sx={{ width: '100%', height: 300 }}>
          <CardActionArea component={Link} to={`/article/${article_id}`}>
            <CardMedia
              component="img"
              height="200"
              sx={{ objectFit: 'cover' }}
              image={image}
              alt={title}
            />
            <CardContent>
              <Typography 
                gutterBottom 
                variant="h6" 
                component="div"
                sx={{
                    fontWeight: 'bold',
                    fontSize: {
                      xs: '0.8rem', 
                      sm: '0.9rem',
                      md: '1rem',
                      lg: '1.1rem', 
                    },
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'wrap',
                  }}
              >
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
};

export default ArticleCard;
