import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParserIntPipe)
    bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {}

  @Patch()
  editBookmarkById(
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
  ) {}

  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParserIntPipe)
    bookmarkId: number,
  ) {}
}
