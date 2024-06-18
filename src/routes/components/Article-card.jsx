import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const ArticleCard = ({ title, image, article_id }) => {
    
    return (
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea component={Link} to={`/article/${article_id}`}>
            <CardMedia
              component="img"
              height="150"
              sx={{ objectFit: 'cover' }}
              image={image}
              alt={title}
            />
            <CardContent>
              <Typography 
                gutterBottom 
                variant="h3" 
                component="div"
                sx={{
                    fontWeight: 'bold', 
                    fontSize: {
                      xs: '1.2rem', 
                      sm: '1.5rem', 
                    }  }}
              >
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
};

export default ArticleCard;
